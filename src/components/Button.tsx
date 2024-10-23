import { ReactNode, MouseEvent} from "react";

interface ButtonType {
  type?: 'submit' | 'button';
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>, index?: number) => void;
}

export default function Button({type = 'button', children, onClick}: ButtonType){
  return(
    <button type={type} onClick={onClick} className="flex items-center justify-center w-[100px] h-16 rounded text-white bg-blue-500 hover:bg-blue-600">{children}</button>
  )
}