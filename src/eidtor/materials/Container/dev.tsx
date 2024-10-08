import { useMaterailDrop } from "../../hooks/useMaterialDrop";
import { CommonComponentProps } from "../../interface";

const Container = ({ id, children, styles }: CommonComponentProps) => {
  const { canDrop, drop } = useMaterailDrop(
    ["Button", "Container", "RedBookCard"],
    id
  );

  return (
    <div
      ref={drop}
      data-component-id={id}
      style={styles}
      className={`min-h-[100px] p-[20px] ${
        canDrop ? "border-[2px] border-[blue]" : "border-[1px] border-[#000]"
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
