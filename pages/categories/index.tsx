// Settings.js

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { UserCategories } from '@/components/usercategories/UserCategories';

export default function Settings() {
  const router = useRouter();
  const [categories, setCategories] = useState<[] | undefined>(undefined);
  const [uploadStatus, setUploadStatus] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const storedToken = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('token') : null;
  const storedClientId = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('clientId') : null;
  const alias = process.env.NEXT_PUBLIC_ALIAS;
  const apiEndpoint = alias == "pro"
    ? `https://${storedClientId}-api.komsai.com/backoffice/categories`
    : `https://${alias}-${storedClientId}-api.komsai.com/backoffice/categories`;
  const apiKey = process.env.NEXT_PUBLIC_X_API_KEY;
  //TCBrcNgHl4RXldG7EmLnmp4Y7cfBXtAvaTEU644p-dlabs
  //mhq0AZdh1lFgBCGmpYK3zw7bSEGPyCtc6j4lKZzW-dibet

  const fetchDataFromApi = useCallback(async (storedToken: any, storedClientId: any) => {
    try {
      // WITH THIS CONF, CHANGES DONE ARE NOT DISCARDED WHEN CHANGING TAB
      // const storedCategories = sessionStorage.getItem('categories');
      // if (storedCategories) {
      //   setCategories(JSON.parse(storedCategories));
      //   setLoading(false);
      //   return;
      // }
      const headers: HeadersInit = {
        'cytoken': storedToken || '',
        'cysource': 'backoffice',
        'cyclientid': storedClientId || '',
      };

      if (apiKey) {
        headers['x-api-key'] = apiKey;
      }
      const response = await fetch(apiEndpoint, {
        method: 'GET',
        headers: headers
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Data successfully loaded.');
        setCategories(data);
        sessionStorage.setItem('categories', JSON.stringify(data));
      } else if (response.status == 401 || 403) {
        setUploadStatus('Your session has expired, please log in again.');
        setShowErrorAlert(true);
        setCategories(undefined);
        setTimeout(() => {
          setShowSuccessAlert(false);
          setShowErrorAlert(false);
          router.push('/others/sign-in');
        }, 3000);
      } else {
        console.log('Data not initialized.');
        setCategories([]);
      }
    } catch (error) {
      setUploadStatus('An unexpected error occurred while obtaining data. Wait a few minutes to try again.');
      console.error('Error while fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [apiEndpoint, router]);

  const handleSubmit = async () => {
    try {
      const headers: HeadersInit = {
        'cytoken': storedToken || '', // Make sure 'cytoken' is never undefined
        'cysource': 'backoffice',
        'cyclientid': storedClientId || '', // Make sure 'cyclientid' is never undefined
      };

      if (apiKey) {
        headers['x-api-key'] = apiKey;
      }
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify(categories),
        headers: headers,
      });
      if (response.status == 401) {
        setUploadStatus('Your session has expired, please log in again to save changes.');
        setShowErrorAlert(true);
      } else if (response.ok) {
        setUploadStatus('Components saved successfully');
        setShowSuccessAlert(true);
      } else {
        setUploadStatus('Failed to save components, please try again');
        setShowErrorAlert(true);
      }
    } catch (error: any) {
      if (error instanceof Error) {
        setUploadStatus('Failed to save changes: ' + error.message);
      } else {
        setUploadStatus('An unknown error occurred while saving changes.');
      }
      setShowErrorAlert(true);
    }

    setTimeout(() => {
      setShowSuccessAlert(false);
      setShowErrorAlert(false);
    }, 3000);
  };

  useEffect(() => {
    if (categories && categories.length > 0) {
      sessionStorage.setItem('categories', JSON.stringify(categories));
    }

  }, [categories, router]);

  useEffect(() => {
    if (storedToken && storedClientId) {
      fetchDataFromApi(storedToken, storedClientId);
    } else {
      router.push('/others/sign-in');
    }
  }, []);



  return (
    <>
      <UserCategories
        categories={categories}
        setCategories={setCategories}
        onSubmit={handleSubmit}
        loading={loading}
        showSuccessAlert={showSuccessAlert}
        showErrorAlert={showErrorAlert}
        uploadStatus={uploadStatus}
      />
    </>
  );
}
