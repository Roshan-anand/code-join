import React, { SetStateAction, useEffect, useRef } from "react";
import {
  setEditorHeight,
  setEditorWidth,
} from "../providers/redux/slices/editor";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../providers/redux/store";

const useResizeable = ({
  setWindowWidth,
  containerRef,
}: {
  setWindowWidth: React.Dispatch<SetStateAction<number>>;
  containerRef: React.RefObject<HTMLDivElement>;
}) => {
  const dispatch = useDispatch();
  const { sideBarOpt } = useSelector((state: ReduxState) => state.file);

  const isDraggingSidebar = useRef(false);
  const isDraggingEditor = useRef(false);

  // Handle Sidebar Resize (Horizontal)
  const startSidebarResize = () => {
    isDraggingSidebar.current = true;
    document.addEventListener("mousemove", handleSidebarResize);
    document.addEventListener("mouseup", stopSidebarResize);
    document.addEventListener("touchmove", handleSidebarResize);
    document.addEventListener("touchend", stopSidebarResize);
  };

  const handleSidebarResize = (e: MouseEvent | TouchEvent) => {
    if (!isDraggingSidebar.current || !containerRef.current) return;
    const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
    const containerRect = containerRef.current.getBoundingClientRect();
    dispatch(setEditorWidth(containerRect.right - clientX));
  };

  const stopSidebarResize = () => {
    isDraggingSidebar.current = false;
    document.removeEventListener("mousemove", handleSidebarResize);
    document.removeEventListener("mouseup", stopSidebarResize);
    document.removeEventListener("touchmove", handleSidebarResize);
    document.removeEventListener("touchend", stopSidebarResize);
  };

  // 👉 Handle Editor Resize (Vertical)
  const startEditorResize = () => {
    isDraggingEditor.current = true;
    document.addEventListener("mousemove", handleEditorResize);
    document.addEventListener("mouseup", stopEditorResize);
    document.addEventListener("touchmove", handleEditorResize);
    document.addEventListener("touchend", stopEditorResize);
  };

  const handleEditorResize = (e: MouseEvent | TouchEvent) => {
    if (!isDraggingEditor.current || !containerRef.current) return;
    const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
    const containerRect = containerRef.current.getBoundingClientRect();
    dispatch(setEditorHeight(clientY - containerRect.top));
  };

  const stopEditorResize = () => {
    isDraggingEditor.current = false;
    document.removeEventListener("mousemove", handleEditorResize);
    document.removeEventListener("mouseup", stopEditorResize);
    document.removeEventListener("touchmove", handleEditorResize);
    document.removeEventListener("touchend", stopEditorResize);
  };

  //to update the window width on resize
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
      dispatch(setEditorWidth(window.innerWidth - (sideBarOpt ? 400 : 100)));
    };

    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [dispatch, sideBarOpt, setWindowWidth]);

  return { startSidebarResize, startEditorResize };
};

export default useResizeable;
