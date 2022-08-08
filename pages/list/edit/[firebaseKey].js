import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleList } from '../../../api/listData';
import ListForm from '../../../components/forms/ListForm';

function EditList() {
  const [listObj, setEditList] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  useEffect(() => {
    getSingleList(firebaseKey).then(setEditList);
  }, [firebaseKey]);
  return (
    <ListForm obj={listObj} />
  );
}

export default EditList;
