import React from 'react';
import conf from '../config/config';

function ConfigDebug() {
  const envVars = {
    'Project ID': conf.appwriteProjectId,
    'Database ID': conf.appwriteDatabaseId,
    'Collection ID': conf.appwriteCollectionId,
    'Bucket ID': conf.appwriteBucketId,
    'URL': conf.appwriteUrl
  };

  const missingVars = Object.entries(envVars)
    .filter(([key, value]) => !value || value === 'undefined')
    .map(([key]) => key);

  if (process.env.NODE_ENV === 'production') {
    return null; // Don't show in production
  }

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-800 p-4 rounded-lg max-w-sm z-50">
      <h3 className="font-bold text-sm mb-2">🔧 Appwrite Config Debug</h3>
      
      {missingVars.length > 0 ? (
        <div>
          <p className="text-xs mb-2">❌ Missing environment variables:</p>
          <ul className="text-xs list-disc list-inside">
            {missingVars.map(varName => (
              <li key={varName}>{varName}</li>
            ))}
          </ul>
          <p className="text-xs mt-2">
            💡 Create a <code>.env</code> file with your Appwrite project details.
          </p>
        </div>
      ) : (
        <p className="text-xs">✅ All environment variables configured</p>
      )}
      
      <details className="mt-2">
        <summary className="text-xs cursor-pointer">Show values</summary>
        <pre className="text-xs mt-1 overflow-auto">
          {JSON.stringify(envVars, null, 2)}
        </pre>
      </details>
    </div>
  );
}

export default ConfigDebug;