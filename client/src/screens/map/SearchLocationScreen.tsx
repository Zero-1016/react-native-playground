import {useState} from 'react';
import useUserLocation from '@/hooks/useUserLocation';
import useSearchLocation from '@/hooks/useSearchLocation';
import {Keyboard} from 'react-native';
import SearchInput from '@/components/common/SearchInput';
import styled from '@emotion/native';
import SearchRegionResult from '@/components/map/SearchRegionResult';
import Pagination from '@/components/common/Pagination';

function SearchLocationScreen() {
  const [keyword, setKeyword] = useState('');
  const {userLocation} = useUserLocation();
  const {regionInfo, hasNextPage, pageParam, fetchNextPage, fetchPrevPage} =
    useSearchLocation(keyword, userLocation);

  const handleChangeKeyword = (text: string) => {
    setKeyword(text);
  };
  console.log(regionInfo);
  return (
    <S.Container>
      <SearchInput
        autoFocus
        value={keyword}
        onChangeText={handleChangeKeyword}
        placeholder="장소를 검색해보세요."
        onSubmit={Keyboard.dismiss}
      />
      <SearchRegionResult regionInfo={regionInfo} />
      <Pagination
        pageParam={pageParam}
        fetchPrevPage={fetchPrevPage}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        totalLength={regionInfo.length}
      />
    </S.Container>
  );
}

const S = {
  Container: styled.View`
    flex: 1;
    padding: 20px;
  `,
};

export default SearchLocationScreen;
