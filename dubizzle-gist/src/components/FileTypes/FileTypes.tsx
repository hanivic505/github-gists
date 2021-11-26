import { getFileType } from "../../helpers/fileType";

interface IProps {
  files: { [id: string]: any };
}
export default function FileTypes({ files }: IProps) {
  return (
    <ul className="flex">
      {Object.keys(files).map((key, index) => {
        const type = getFileType(files[key].type);
        return (
          <li
            key={index}
            data-type={type}
            className={`rounded-full py-1 px-2 mr-1 bg-yellow-500 ${type}`}
          >
            <a href={files[key].raw_url} target="_blank" rel="noreferrer">
              {type}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
