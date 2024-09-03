import { Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useComponetsStore } from "../../../stores/components";

export interface ShowMessageConfig {
  type: "showMessage";
  config: {
    type: "success" | "error";
    text: string;
  };
}

export interface ShowMessageProps {
  value?: ShowMessageConfig["config"];
  defalutValue?: ShowMessageConfig["config"];
  onChange?: (config: ShowMessageConfig) => void;
}

export const ACTION_SHOW_MESSAGE = "showMessage";

export function ShowMessage(props: ShowMessageProps) {
  const { value, defalutValue, onChange } = props;

  const { curComponentId } = useComponetsStore();

  const [type, setType] = useState<"success" | "error">(
    defalutValue?.type || "success"
  );
  const [text, setText] = useState<string>(defalutValue?.text || "");

  useEffect(() => {
    if (value) {
      setText(value.text);
      setType(value.type);
    }
  }, [value]);

  function messageTypeChange(value: "success" | "error") {
    if (!curComponentId) return;

    setType(value);

    onChange?.({
      type: ACTION_SHOW_MESSAGE,
      config: {
        type: value,
        text,
      },
    });
  }

  function messageTextChange(value: string) {
    if (!curComponentId) return;

    setText(value);

    onChange?.({
      type: "showMessage",
      config: {
        type,
        text: value,
      },
    });
  }

  return (
    <div className="mt-[30px]">
      <div className="flex items-center gap-[20px]">
        <div>类型：</div>
        <div>
          <Select
            style={{ width: 500, height: 50 }}
            options={[
              { label: "成功", value: "success" },
              { label: "失败", value: "error" },
            ]}
            onChange={(value) => {
              messageTypeChange(value);
            }}
            value={type}
          />
        </div>
      </div>
      <div className="flex items-center gap-[20px] mt-[50px]">
        <div>文本：</div>
        <div>
          <Input
            style={{ width: 500, height: 50 }}
            onChange={(e) => {
              messageTextChange(e.target.value);
            }}
            value={text}
          />
        </div>
      </div>
    </div>
  );
}
