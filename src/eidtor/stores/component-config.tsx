import { create } from "zustand";
import ButtonDev from "../materials/Button/dev";
import ButtonProd from "../materials/Button/prod";
import ContainerDev from "../materials/Container/dev";
import ContainerProd from "../materials/Container/prod";
import PageDev from "../materials/Page/dev";
import PageProd from "../materials/Page/prod";
import RedBookCard from "../materials/Red/dev";

export interface ComponentSetter {
  name: string;
  label: string;
  type: string;
  [key: string]: any;
}

export interface ComponentEvent {
  name: string;
  label: string;
}

export interface ComponentConfig {
  name: string;
  defaultProps: Record<string, any>;
  desc: string;
  setter?: ComponentSetter[];
  stylesSetter?: ComponentSetter[];
  events?: ComponentEvent[];
  dev: any;
  prod: any;
}

interface State {
  componentConfig: { [key: string]: ComponentConfig };
}

interface Action {
  registerComponent: (name: string, componentConfig: ComponentConfig) => void;
}

export const useComponentConfigStore = create<State & Action>((set) => ({
  componentConfig: {
    Container: {
      name: "Container",
      defaultProps: {},
      desc: "容器",
      dev: ContainerDev,
      prod: ContainerProd,
    },
    Button: {
      name: "Button",
      defaultProps: {
        type: "primary",
        text: "按钮",
      },
      setter: [
        {
          name: "type",
          label: "按钮类型",
          type: "select",
          options: [
            { label: "主按钮", value: "primary" },
            { label: "次按钮", value: "default" },
          ],
        },
        {
          name: "text",
          label: "文本",
          type: "input",
        },
      ],
      stylesSetter: [
        {
          name: "width",
          label: "宽度",
          type: "inputNumber",
        },
        {
          name: "height",
          label: "高度",
          type: "inputNumber",
        },
      ],
      events: [
        {
          name: "onClick",
          label: "点击事件",
        },
        {
          name: "onDoubleClick",
          label: "双击事件",
        },
      ],
      desc: "按钮",
      dev: ButtonDev,
      prod: ButtonProd,
    },
    RedBookCard: {
      name: "RedBookCard",
      defaultProps: {},
      desc: "封面卡片",
      dev: RedBookCard,
      prod: RedBookCard,
      setter: [
        {
          name: "sub_title",
          label: "文本",
          type: "input",
        },
        {
          name: "desc",
          label: "文本",
          type: "input",
        },
        {
          name: "tags",
          label: "文本",
          type: "input",
        },
      ],
      props: {},
    },
    Page: {
      name: "Page",
      defaultProps: {},
      desc: "页面",
      dev: PageDev,
      prod: PageProd,
    },
  },
  registerComponent: (name, componentConfig) =>
    set((state) => {
      return {
        ...state,
        componentConfig: {
          ...state.componentConfig,
          [name]: componentConfig,
        },
      };
    }),
}));
