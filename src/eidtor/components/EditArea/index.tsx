/* eslint-disable react-hooks/exhaustive-deps */
import React, { MouseEventHandler, useEffect, useState } from "react";
import { useComponentConfigStore } from "../../stores/component-config";
import { Component, useComponetsStore } from "../../stores/components";
import HoverMask from "../HoverMask";
import SelectedMask from "../SelectedMask";

export function EditArea() {
  const { components, addComponent, curComponentId, setCurComponentId } =
    useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  useEffect(() => {
    addComponent(
      {
        id: 222,
        name: "Container",
        desc: "容器",
        props: {},
        children: [],
      },
      1
    );

    addComponent(
      {
        id: 333,
        name: "Button",
        props: {
          text: "无敌",
        },
        desc: "按钮",
        children: [],
      },
      222
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component: Component) => {
      const config = componentConfig?.[component.name];

      if (!config?.component) {
        return null;
      }

      return React.createElement(
        config.component,
        {
          key: component.id,
          id: component.id,
          name: component.name,
          styles: component.styles,
          ...config.defaultProps,
          ...component.props,
        },
        renderComponents(component.children || [])
      );
    });
  }

  const [hoverComponentId, setHoverComponentId] = useState<number>(0);

  const processMouseEvent = (e, handler: (id: number) => void) => {
    const path = e.nativeEvent.composedPath();

    for (let i = 0; i < path.length; i += 1) {
      const ele = path[i] as HTMLElement;

      const componentId = ele.dataset?.componentId;
      if (componentId) {
        handler(+componentId);
        return;
      }
    }
  };

  const handleMouseOver: MouseEventHandler = (e) => {
    processMouseEvent(e, setHoverComponentId);
  };

  const handleClick: MouseEventHandler = (e) => {
    processMouseEvent(e, setCurComponentId);
  };

  return (
    <div
      className="h-[100%] edit-area"
      onMouseOver={handleMouseOver}
      onMouseLeave={() => {
        setHoverComponentId(undefined);
      }}
      onClick={handleClick}
    >
      {renderComponents(components)}
      {hoverComponentId && hoverComponentId !== curComponentId && (
        <HoverMask
          portalWrapperClassName="portal-wrapper"
          containerClassName="edit-area"
          componentId={hoverComponentId}
        />
      )}
      {curComponentId && (
        <SelectedMask
          portalWrapperClassName="portal-wrapper"
          containerClassName="edit-area"
          componentId={curComponentId}
        />
      )}
      <div className="portal-wrapper"></div>
    </div>
  );
}
