import { useDispatch, useSelector } from "react-redux";
import { convertToFolder } from "../../lib/FolderConvertor";
import { FolderStructureType } from "../../lib/Types";
import { ReduxState } from "../../providers/redux/store";
import { useEffect, useState } from "react";
import {
  setCurrentFolder,
  setOpenedFile,
} from "../../providers/redux/slices/file";
import { langExt } from "../../lib/languages";

const FilesOpt = () => {
  //global state from redux
  const dispatch = useDispatch();
  const { folderStructure, openedFile } = useSelector(
    (state: ReduxState) => state.file
  );
  const { roomID } = useSelector((state: ReduxState) => state.room);

  const [folderElement, setfolderElement] = useState<JSX.Element[]>([]);
  const [activeEle, setactiveEle] = useState("");

  useEffect(() => {
    //to handle the click on the file
    const handleFileClick = (fileName: string, loc: string) => {
      if (!roomID) return;
      const openedFile = `${loc}${fileName}`;
      setactiveEle(openedFile);
      const lang= langExt[fileName.split(".").pop() as string] || "plaintext";
      dispatch(setOpenedFile({ lang, openedFile, loc }));
    };

    const handleFolderClick = (loc: string, key: string) => {
      setactiveEle(`${loc}${key}`);
      dispatch(setCurrentFolder(`${loc}${key}/`));
    };

    //to convert the JS object to JSX elements
    const createElements = (folder: FolderStructureType, loc: string) => {
      const elements = [];
      for (const key in folder) {
        //if it is a file
        if (folder[key] == "file") {
          elements.push(
            <h4
              className={`file-txt ${
                activeEle === `${loc}${key}` && "bg-accent-400"
              }`}
              key={key}
              onClick={() => handleFileClick(key, loc)}
            >
              {key}
            </h4>
          );
        } else {
          //if it is a folder
          elements.push(
            <details key={key} className="[&_h4]:pl-3">
              <summary
                className={`file-txt ${
                  activeEle === `${loc}${key}` && "bg-accent-400"
                }`}
                id={key}
                onClick={() => handleFolderClick(loc, key)}
              >
                {key}
              </summary>
              <pre>
                {createElements(
                  folder[key] as FolderStructureType,
                  `${loc}${key}/`
                )}
              </pre>
            </details>
          );
        }
      }
      return elements;
    };

    if (!folderStructure) return;
    const root  = convertToFolder(folderStructure);
    setfolderElement(createElements(root as FolderStructureType, ""));
  }, [folderStructure, activeEle, dispatch, roomID, openedFile]);

  return (
    <figure className="size-full px-1">
      <section className="flex justify-between border-b-2">app</section>
      {folderElement}
    </figure>
  );
};

export default FilesOpt;
