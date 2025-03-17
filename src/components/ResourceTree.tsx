
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";
import { CVETable } from './CVETable';

type CVEInfo = {
  id: string;
  outcome: string;
  criticality: string;
  verified: string;
};

type ResourceNode = {
  id: string;
  name: string;
  type?: 'service' | 'application' | 'environment' | 'resourceType' | 'resource';
  children?: ResourceNode[];
  cveInfo?: CVEInfo[];
  hidden?: boolean;
};

const mockData: ResourceNode = {
  id: '1',
  name: 'Billing',
  type: 'service',
  children: [
    {
      id: '2',
      name: 'Invoicing',
      type: 'application',
      children: [
        {
          id: '3',  
          name: 'Production',
          type: 'environment',
          children: [
            {
              id: '4',
              name: 'Containers',
              type: 'resourceType',
              children: [
                {
                  id: '5',
                  name: 'Container1',
                  type: 'resource',
                  cveInfo: [
                    {
                      id: 'CVE-2023-6347',
                      outcome: 'Remote Code Execution',
                      criticality: 'Critical',
                      verified: 'Yes'
                    },
                    {
                      id: 'CVE-XXXX-XXXXX',
                      outcome: 'Data Exposure',
                      criticality: 'High',
                      verified: 'No'
                    }
                  ]
                },
                {
                  id: '6',
                  name: 'Container2',
                  type: 'resource',
                  cveInfo: [
                    {
                      id: 'CVE-2023-5432',
                      outcome: 'Privilege Escalation',
                      criticality: 'High',
                      verified: 'Yes'
                    }
                  ]
                }
              ]
            },
            {
              id: '7',
              name: 'Virtual Machines',
              type: 'resourceType',
              children: [
                {
                  id: '8',
                  name: 'VM1',
                  type: 'resource',
                  cveInfo: [
                    {
                      id: 'CVE-2023-7890',
                      outcome: 'Memory Leak',
                      criticality: 'Medium',
                      verified: 'Yes'
                    }
                  ]
                },
                {
                  id: '9',
                  name: 'VM2',
                  type: 'resource',
                  cveInfo: [
                    {
                      id: 'CVE-2023-3456',
                      outcome: 'SQL Injection',
                      criticality: 'High',
                      verified: 'Yes'
                    }
                  ]
                }
              ]
            },
            {
              id: '10',
              name: 'Serverless',
              type: 'resourceType',
              children: [
                {
                  id: '11',
                  name: 'Serverless 1',
                  type: 'resource',
                  cveInfo: [
                    {
                      id: 'CVE-2023-9123',
                      outcome: 'Information Disclosure',
                      criticality: 'Medium',
                      verified: 'No'
                    }
                  ]
                },
                {
                  id: '12',
                  name: 'Serverless 2',
                  type: 'resource',
                  cveInfo: [
                    {
                      id: 'CVE-2023-4567',
                      outcome: 'Denial of Service',
                      criticality: 'High',
                      verified: 'Yes'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: '13',
          name: 'Staging',
          type: 'environment',
          children: [
            {
              id: '14',
              name: 'Containers',
              type: 'resourceType',
              children: [
                {
                  id: '15',
                  name: 'Staging-Container1',
                  type: 'resource',
                  cveInfo: [
                    {
                      id: 'CVE-2023-1111',
                      outcome: 'Remote Code Execution',
                      criticality: 'Critical',
                      verified: 'Yes'
                    }
                  ]
                }
              ]
            },
            {
              id: '16',
              name: 'Virtual Machines',
              type: 'resourceType',
              children: [
                {
                  id: '17',
                  name: 'Staging-VM1',
                  type: 'resource',
                  cveInfo: [
                    {
                      id: 'CVE-2023-2222',
                      outcome: 'Memory Corruption',
                      criticality: 'High',
                      verified: 'No'
                    }
                  ]
                }
              ]
            },
            {
              id: '18',
              name: 'Serverless',
              type: 'resourceType',
              children: [
                {
                  id: '19',
                  name: 'Staging-Serverless1',
                  type: 'resource',
                  cveInfo: [
                    {
                      id: 'CVE-2023-3333',
                      outcome: 'Authentication Bypass',
                      criticality: 'Critical',
                      verified: 'Yes'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: '20',
          name: 'Development',
          type: 'environment',
          children: [
            {
              id: '21',
              name: 'Containers',
              type: 'resourceType',
              children: [
                {
                  id: '22',
                  name: 'Dev-Container1',
                  type: 'resource',
                  cveInfo: [
                    {
                      id: 'CVE-2023-4444',
                      outcome: 'Path Traversal',
                      criticality: 'Medium',
                      verified: 'No'
                    }
                  ]
                }
              ]
            },
            {
              id: '23',
              name: 'Virtual Machines',
              type: 'resourceType',
              children: [
                {
                  id: '24',
                  name: 'Dev-VM1',
                  type: 'resource',
                  cveInfo: [
                    {
                      id: 'CVE-2023-5555',
                      outcome: 'Cross-site Scripting',
                      criticality: 'Medium',
                      verified: 'Yes'
                    }
                  ]
                }
              ]
            },
            {
              id: '25',
              name: 'Serverless',
              type: 'resourceType',
              children: [
                {
                  id: '26',
                  name: 'Dev-Serverless1',
                  type: 'resource',
                  cveInfo: [
                    {
                      id: 'CVE-2023-6666',
                      outcome: 'Command Injection',
                      criticality: 'High',
                      verified: 'No'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: '27',
      name: 'Payments',
      type: 'application',
    }
  ]
};

const ResourceNodeComponent: React.FC<{
  node: ResourceNode;
  depth: number;
  expanded: Set<string>;
  onToggle: (id: string) => void;
}> = ({ node, depth, expanded, onToggle }) => {
  const isExpanded = expanded.has(node.id);
  const hasChildren = node.children && node.children.length > 0;
  
  // Style for each node type to make the hierarchy more visually distinct
  const getNodeStyles = () => {
    switch(node.type) {
      case 'service':
        return "font-semibold text-blue-600 dark:text-blue-400";
      case 'application':
        return "font-medium text-purple-600 dark:text-purple-400";
      case 'environment':
        return "font-medium text-green-600 dark:text-green-400";
      case 'resourceType':
        return "font-medium";
      case 'resource':
        return "text-slate-700 dark:text-slate-300";
      default:
        return "";
    }
  };

  return (
    <div>
      <div 
        className={cn(
          "flex items-center py-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer",
          depth === 0 && "border-t border-slate-200 dark:border-slate-800"
        )}
        style={{ paddingLeft: `${depth * 20}px` }}
        onClick={() => onToggle(node.id)}
      >
        <div className="mr-1">
          {hasChildren && (
            isExpanded ? (
              <ChevronDown className="h-4 w-4 text-slate-500" />
            ) : (
              <ChevronRight className="h-4 w-4 text-slate-500" />
            )
          )}
        </div>
        <span className={cn("text-sm", getNodeStyles())}>{node.name}</span>
        
        {/* Add badge for resource nodes with CVEs */}
        {node.type === 'resource' && node.cveInfo && node.cveInfo.length > 0 && (
          <span className="ml-2 px-1.5 py-0.5 text-xs bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 rounded-full">
            {node.cveInfo.length}
          </span>
        )}
      </div>

      {isExpanded && (
        <>
          {node.cveInfo && node.cveInfo.length > 0 && <CVETable cveInfo={node.cveInfo} />}
          {node.children && (
            <div>
              {node.children.map((child) => (
                <ResourceNodeComponent
                  key={child.id}
                  node={child}
                  depth={depth + 1}
                  expanded={expanded}
                  onToggle={onToggle}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export function ResourceTree() {
  // Initially expand service, application, and resource type nodes (Containers, VMs, Serverless)
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['1', '2', '3', '4', '7', '10']));

  const toggleNode = (id: string) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpanded(newExpanded);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-teal-600 dark:text-teal-400" />
          <h2 className="text-lg font-semibold">Cloud Resource Inspector</h2>
        </div>
        <p className="text-sm text-slate-500">Discover and manage cloud resources vulnerabilities</p>
      </div>
      <ResourceNodeComponent
        node={mockData}
        depth={0}
        expanded={expanded}
        onToggle={toggleNode}
      />
    </div>
  );
}
