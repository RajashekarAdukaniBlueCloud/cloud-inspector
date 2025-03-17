
import React from 'react';
import { Button } from '@/components/ui/button';

type CVEInfo = {
  id: string;
  outcome: string;
  criticality: string;
  verified: string;
};

interface CVETableProps {
  cveInfo: CVEInfo[];
}

export const CVETable: React.FC<CVETableProps> = ({ cveInfo }) => (
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
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  cve.criticality === 'Critical' ? 'bg-red-100 text-red-800' :
                  cve.criticality === 'High' ? 'bg-orange-100 text-orange-800' :
                  cve.criticality === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {cve.criticality}
                </span>
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
