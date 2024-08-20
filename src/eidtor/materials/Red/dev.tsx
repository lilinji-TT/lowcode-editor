import { CommonComponentProps } from "../../interface";

interface RedBookProps {
  sub_title?: string;
  desc: string;
  tags: string;
}

function RedBookCard({
  id,
  sub_title,
  desc,
  tags,
}: RedBookProps & CommonComponentProps) {
  return (
    <div
      data-component-id={id}
      className="bg-gray-100 p-6 rounded-lg shadow-lg text-center w-64 mt-4"
    >
      <h1 className="text-red-600 text-4xl font-bold mb-4">天涯神贴</h1>
      <h2 className="text-black text-2xl font-medium mb-2 mt-8">{sub_title}</h2>
      <p className="text-gray-800 text-lg mt-6">{desc}</p>
      <div className="text-gray-600 mt-12">{tags}</div>
    </div>
  );
}

export default RedBookCard;
