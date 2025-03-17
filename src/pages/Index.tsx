
import { ResourceTree } from "@/components/ResourceTree";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Cloud Inspector</h1>
        <ResourceTree />
      </div>
    </div>
  );
};

export default Index;
