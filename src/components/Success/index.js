import React from "react";
import "antd/dist/antd.css";
import Result from "antd/es/result";

const Success = (success) => {
  return (
    <div>
      <Result status="success" title={<h1>Ваша анкета отправлена!</h1>} />,
    </div>
  );
};

export default Success;
