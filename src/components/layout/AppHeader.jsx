import { useEffect, useState } from "react";
import { Layout, Select, Space, Button, Modal } from "antd";
import { useCrypto } from "../../context/crypto-context";
import CoinInfoModal from "./CoinInfoModal";

const headerStyle = {
  width: "100%",
  textAlign: "center",
  height: 60,
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export default function AppHeader() {
  const [select, setSelect] = useState(false);
  const [modal, setModal] = useState(false);
  const [coin, setCoin] = useState(null);
  const { crypto } = useCrypto();

  useEffect(() => {
    const keypress = (e) => {
      if (e.key === "/") {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener("keypress", keypress);
    return () => document.removeEventListener("keypress", keypress);
  }, []);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setModal(true);
    setCoin(crypto.find(c => c.id === value));
  };

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{ width: 250 }}
        open={select}
        onSelect={handleChange}
        onClick={() => setSelect((prev) => !prev)}
        value="press / to open"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />{" "}
            {option.data.label}
          </Space>
        )}
      />
      <Button type="primary">Add Asset</Button>

      <Modal
        open={modal}
        onCancel={() => setModal(false)}
        footer={null}
      >
        <CoinInfoModal coin={coin} />
      </Modal>
    </Layout.Header>
  );
}
