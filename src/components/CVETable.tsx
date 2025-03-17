
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type CVEInfo = {
  id: string;
  outcome: string;
  criticality: string;
  verified: string;
};

interface CVETableProps {
  cveInfo: CVEInfo[];
}

export const CVETable: React.FC<CVETableProps> = ({ cveInfo }) => {
  // Helper function to get color based on criticality
  const getCriticalityColor = (criticality: string) => {
    switch (criticality) {
      case 'Critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'High':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    }
  };

  return (
    <div className="ml-8 mb-4">
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-black text-white">
              <th className="text-left text-xs font-medium p-2">CVE ID</th>
              <th className="text-left text-xs font-medium p-2">Outcome</th>
              <th className="text-left text-xs font-medium p-2">Criticality</th>
              <th className="text-left text-xs font-medium p-2">Verified</th>
              <th className="text-left text-xs font-medium p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cveInfo.map((cve, index) => (
              <tr key={index} className="border-t border-slate-200 dark:border-slate-700">
                <td className="p-2 text-sm text-blue-600 font-medium">{cve.id}</td>
                <td className="p-2 text-sm text-slate-600 dark:text-slate-300">{cve.outcome}</td>
                <td className="p-2 text-sm">
                  <Badge className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    getCriticalityColor(cve.criticality)
                  )}>
                    {cve.criticality}
                  </Badge>
                </td>
                <td className="p-2 text-sm text-slate-600 dark:text-slate-300">{cve.verified}</td>
                <td className="p-2">
                  <Button variant="outline" size="sm">
                    View details and remediation plan
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
