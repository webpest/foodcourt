import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useState } from "react";
import { Setting, useAppStore } from "@/store/app-store";

type SettingModalProps = {
  open: boolean;
  onCloseModal: () => void;
};

const SettingModal = (props: SettingModalProps) => {
  const { open, onCloseModal } = props;
  const savedSettings = useAppStore((state) => state.setting);
  const saveSetting = useAppStore((state) => state.setSetting);
  const [settings, setSettings] = useState<Setting | null>(savedSettings);

  const handleSaveSettings = () => {
    if (settings) {
      saveSetting(settings);
      onCloseModal();
    }
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSettings((prevSettings) => ({
      ...(prevSettings as Setting),
      [name]: checked,
    }));
  };

  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      center
      blockScroll
      closeOnOverlayClick={false}
      closeOnEsc={false}
      classNames={{
        modal: "modal-box max-w-[300px]",
      }}
    >
      <h2 className="font-bold text-lg -mt-2">Password Settings</h2>
      <div className="form-control mt-6 w-auto">
        <label className="label cursor-pointer justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-xs"
            name="uppercase"
            checked={!!settings?.uppercase}
            onChange={handleOnChange}
          />
          <span className="label-text ml-2">At least 1 uppercase</span>
        </label>
        <label className="label cursor-pointer justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-xs"
            name="lowercase"
            checked={!!settings?.lowercase}
            onChange={handleOnChange}
          />
          <span className="label-text ml-2">At least 1 lowercase</span>
        </label>
        <label className="label cursor-pointer justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-xs"
            name="figures"
            checked={!!settings?.figures}
            onChange={handleOnChange}
          />
          <span className="label-text ml-2">At least 1 figure</span>
        </label>
        <label className="label cursor-pointer justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-xs"
            name="special"
            checked={!!settings?.special}
            onChange={handleOnChange}
          />
          <span className="label-text ml-2">At least 1 special character</span>
        </label>
        <label className="label cursor-pointer justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-xs"
            name="length"
            checked={!!settings?.length}
            onChange={handleOnChange}
          />
          <span className="label-text ml-2">At least 8 characters long</span>
        </label>
        <button className="btn btn-primary mt-6" onClick={handleSaveSettings}>
          Save Settings
        </button>
      </div>
    </Modal>
  );
};

export default SettingModal;
