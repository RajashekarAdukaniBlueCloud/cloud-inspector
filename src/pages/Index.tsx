
import { ResourceTree } from "@/components/ResourceTree";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Cloud Security Inspector</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Visualize your cloud infrastructure and identify security vulnerabilities across your resources.
        </p>
        <ResourceTree />
      </div>
    </div>
  );
};

export default Index;
