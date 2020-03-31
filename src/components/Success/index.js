import React from 'react';
import 'antd/dist/antd.css';
import Result from "antd/es/result";



const Success = () => {

        return (
            <div>

                <Result
                    status="success"
                    title={<h1>Ваша анекта отправлена!</h1>}
                />,
            </div>
        );
    }

export default Success;
