import { ReactNode } from "react";

export default function getDepthStyles(depth: string, pl: boolean = false, children: ReactNode) {
  const depthStyle =
    depth === "1"
      ? "depth1-styles"
      : depth === "2"
        ? "depth2-styles"
        : depth === "3"
          ? "depth3-styles"
          : depth === "4"
            ? "depth4-styles"
            : "depth5-styles";

  return <div className={`${depthStyle} ${!pl && "depth-pl-common"}`}>{children}</div>;
}
