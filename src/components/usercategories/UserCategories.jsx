import React, { useState, useEffect } from 'react';
import {
  Box,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import SubCategoriesPage from './SubCategoriesPage';
import { LoadingPopup } from '@/utils/loadingUtils';
export function UserCategories({
  categories,
  setCategories,
  onSubmit,
  loading,
  showSuccessAlert,
  showErrorAlert,
  uploadStatus,
}) {
  const router = useRouter();
  const [subcategoriesOfPath, setSubcategoriesOfPath] = useState(categories);

  useEffect(() => {
    setSubcategoriesOfPath(categories);
  }, [categories]);
  const pathParam = router.query.path;
  let path = []
  if (pathParam) {
    path = pathParam ? pathParam.split(',').map(Number) : [];
  }
  
  return (
    <>

      <Box mt={{ base: '70px', md: '0px', xl: '0px' }}>
        <div className="App">
          {showSuccessAlert && (
            <div className="alert-container success">
              <Alert status="success">
                <AlertIcon />
                {uploadStatus}
              </Alert>
            </div>
          )}
          {showErrorAlert && (
            <div className="alert-container error">
              <Alert status="error">
                <AlertIcon />
                {uploadStatus}
              </Alert>
            </div>
          )}
          {!loading && categories ? (
            <SubCategoriesPage
              categories={categories}
              path={path}
              onChange={setCategories}
              onSubmit={onSubmit}
            />
          ) : null}
          {loading && <LoadingPopup />}
        </div>
      </Box>
    </>
  );
}
