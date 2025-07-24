import clsx from 'clsx';
import { useMemo, useState } from 'react';

import type { JsonData } from '../../types';

type JsonObject = { [key: string]: JsonData };

interface Props<T> {
  propertyText?: string;
  data: T;
}

export function JsonViewer({ data }: { data: JsonData }) {
  return (
    <div className="not-prose bg-slate-900 pl-10 pr-4 py-2 rounded-xl max-w-7xl overflow-hidden">
      <JsonBaseViewer propertyText="root" data={data} />
    </div>
  );
}

function JsonBaseViewer({ propertyText, data }: Props<JsonData>) {
  const type = typeof data as 'string' | 'number' | 'boolean' | 'object';
  if (type === 'boolean') {
    return (
      <div className="flex justify-start gap-4">
        <code className="text-gray-300">{propertyText}</code>
        <code className="text-sky-400">(boolean)</code>
        <code className="text-cyan-300">{data ? 'true' : 'false'}</code>
      </div>
    );
  }
  if (type === 'number') {
    return (
      <div className="flex justify-start gap-4">
        <code className="text-gray-300">{propertyText}</code>
        <code className="text-sky-400">(number)</code>
        <code className="text-cyan-300">{data as number}</code>
      </div>
    );
  }

  if (type === 'string') {
    return (
      <div className="flex justify-start gap-4">
        <code className="text-gray-300">{propertyText}</code>
        <code className="text-sky-400">(string)</code>
        <code className="text-cyan-300">"{data as string}"</code>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-start gap-4">
        <code className="text-gray-300">{propertyText}</code>
        <code className="text-sky-400">(null)</code>
      </div>
    );
  }

  if (Array.isArray(data)) {
    return <JsonArrayViewer propertyText={propertyText} data={data} />;
  }

  return (
    <JsonObjectViewer propertyText={propertyText} data={data as { [key: string]: JsonData }} />
  );
}

function JsonArrayViewer({ propertyText, data }: Props<JsonData[]>) {
  const [expanded, setExpanded] = useState(false);

  if (!Object.keys(data).length)
    return (
      <div className="flex justify-start gap-4">
        <code className="text-gray-300">{propertyText}</code>
        <code className="text-sky-400">(array)</code>
        (empty)
      </div>
    );

  return (
    <div className="flex flex-col">
      <div className="flex gap-2 items-center justify-start">
        <ToggleButton {...{ expanded, setExpanded }} />
        <button onClick={() => setExpanded((prev) => !prev)}>
          <code className="text-gray-300">{propertyText}</code>
        </button>
        <code className="text-sky-400">(array)</code>({Object.keys(data).length} items)
      </div>
      {expanded && (
        <div className="pl-6">
          {data.map((value, index) => (
            <div className="flex gap-4 items-start justify-start" key={index}>
              <JsonBaseViewer propertyText={`[${index}]`} data={value} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function JsonObjectViewer({ propertyText, data }: Props<JsonObject>) {
  const [expanded, setExpanded] = useState(false);

  const entries = useMemo(() => {
    return Object.entries(data).sort(([, a], [, b]) => {
      const t1 = typeof a;
      const t2 = typeof b;
      if (t1 === t2) return 0;
      if (t1 === 'object' && a) return -1;
      if (t2 === 'object' && b) return 1;
      return 0;
    });
  }, [data]);

  if (!entries.length)
    return (
      <div className="flex justify-start gap-4">
        <code className="text-gray-300">{propertyText}</code>
        <code className="text-sky-400">(object)</code>
        (empty)
      </div>
    );

  return (
    <div className="flex flex-col">
      <div className="flex gap-2 items-center justify-start">
        <ToggleButton {...{ expanded, setExpanded }} />
        <button onClick={() => setExpanded((prev) => !prev)}>
          <code className="text-gray-300">{propertyText}</code>
        </button>
        <code className="text-sky-400">(object)</code>({Object.keys(data).length} items)
      </div>
      {expanded && (
        <div className="pl-6 ml-0.5">
          {entries.map(([property, value]) => (
            <div className="flex gap-4 items-start justify-start" key={property}>
              <JsonBaseViewer propertyText={`"${property}"`} data={value} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface ToggleButtonProps {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}
function ToggleButton({ expanded, setExpanded }: ToggleButtonProps) {
  const toggle = () => setExpanded((prev) => !prev);
  return (
    <button
      className={clsx(
        'absolute -translate-x-full -ml-2 rounded-sm flex gap-2 text-sm border px-1 py-0.5 w-5 h-5 items-center justify-center font-bold',
        {
          ['bg-slate-400 text-black']: expanded,
        },
        expanded ? 'hover:bg-slate-300' : 'hover:bg-slate-600',
      )}
      onClick={toggle}
    >
      <span>{expanded ? '-' : '+'}</span>
    </button>
  );
}
