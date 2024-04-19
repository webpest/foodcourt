import Header from "@/components/header/Header";
import RegistrationForm from "@/components/reg-form/RegistrationForm";
import { useAppStore } from "@/store/app-store";

function App() {
  const isSettingSet = useAppStore((state) => state.setting !== null);

  return (
    <main className="w-full max-w-[800px] mx-auto">
      <Header isSettingSet={isSettingSet} />
      <section className="mt-20">
        <RegistrationForm
          isSettingSet={isSettingSet}
          handleOnSubmit={() => {}}
        />
      </section>
    </main>
  );
}

export default App;
