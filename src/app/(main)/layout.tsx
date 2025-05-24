import "@/app/globals.css";
import Sidebar from "@/components/sidebar/Sidebar";
import Title from "@/components/title/Title";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="mx-auto w-full max-w-screen-xl px-4 md:px-8 py-4 sm:py-6 md:py-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 font-inter">
          <aside className="w-full lg:col-span-4 lg:mt-0 md:mt-12 mt-20">
            <Sidebar />
          </aside>
          <main className="w-full lg:mt-0 lg:col-span-8">
            <Title />
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
export default Layout;
