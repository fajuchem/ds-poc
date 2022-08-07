import React, { useEffect, useState } from "react";
import "./App.css";

function Input({ children }: any): JSX.Element {
  const subComponentList = Object.keys(Input);
  const components: Record<string, JSX.Element> = {};

  const [value, setValue] = useState("");
  const [maxValue] = useState("1000");
  const [status, setStatus] = useState("invalid");

  const onChange = (e: any) => setValue(e.target.value);

  useEffect(() => {
    setStatus(value ? "valid" : "invalid");
  }, [value]);

  React.Children.forEach(children, (child) => {
    if (subComponentList.includes(child.type.name)) {
      components[child.type.name] = child;
    }
  });

  const icon = components.Icon
    ? React.cloneElement(components.Icon, { value, setValue, maxValue, status })
    : React.createElement(Icon, { value, setValue, maxValue, status });

  return (
    <div className="wrapper">
      {icon}
      <input className="input" value={value} onChange={onChange}></input>
    </div>
  );
}

const Icon = ({ children, ...props }: any) => {
  if (children) {
    if (typeof children === "function") {
      return children(props);
    }
    return children;
  }
  return (
    <div className="icon">
      <img
        alt=""
        width="20px"
        src={
          props.status === "valid"
            ? "https://design-system.immutable.com/currency_icons/currency--imx.svg"
            : "https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png"
        }
      />
    </div>
  );
};
Input.Icon = Icon;

function App() {
  return (
    <div className="App">
      <div>
        DEFAULT INPUT:
        <Input />
      </div>
      <div>
        CUSTOM INPUT:
        <Input>
          <Input.Icon>
            {({ setValue, maxValue, status }: any) => {
              return (
                <>
                  <div className="icon-custom-button">
                    <button onClick={() => setValue(maxValue)}>MAX</button>
                  </div>
                  <div
                    className={
                      "icon-custom " + (status === "valid" ? "green" : "red")
                    }
                  >
                    {status}
                  </div>
                </>
              );
            }}
          </Input.Icon>
        </Input>
      </div>
      <div>
        <Input>
          <Input.Icon>
            <div>override the whole icon slot</div>
          </Input.Icon>
        </Input>
      </div>
    </div>
  );
}

export default App;
