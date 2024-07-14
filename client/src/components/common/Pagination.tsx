import Octicons from 'react-native-vector-icons/Octicons';

import styled from '@emotion/native';
import {colors} from '@/styles/theme/colors';

interface PaginationProps {
  pageParam: number;
  fetchPrevPage: () => void;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  totalLength: number;
}

function Pagination({
  pageParam,
  fetchPrevPage,
  fetchNextPage,
  hasNextPage,
  totalLength,
}: PaginationProps) {
  return (
    <S.Container>
      <S.PageButton onPress={fetchPrevPage} disabled={pageParam <= 1}>
        <Octicons
          name="arrow-left"
          size={15}
          color={
            pageParam > 1 ? colors.Grayscale.BLACK : colors.Grayscale.GRAY_300
          }
          onPress={fetchPrevPage}
          disabled={pageParam <= 1}
        />
        <S.PageButton disabled={pageParam > 1}>
          <S.PageText $isDisabled={pageParam <= 1}>이전페이지</S.PageText>
        </S.PageButton>
      </S.PageButton>

      <S.PageButton
        onPress={fetchNextPage}
        disabled={totalLength === 0 || !hasNextPage}>
        <S.PageText $isDisabled={totalLength > 0 && hasNextPage}>
          다음페이지
        </S.PageText>
        <Octicons
          name="arrow-right"
          size={15}
          color={
            totalLength > 0 && hasNextPage
              ? colors.Grayscale.BLACK
              : colors.Grayscale.GRAY_300
          }
          onPress={fetchNextPage}
          disabled={totalLength === 0 || !hasNextPage}
        />
      </S.PageButton>
    </S.Container>
  );
}

const S = {
  Container: styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 5px 0 5px;
  `,
  PageButton: styled.Pressable`
    flex-direction: row;
    align-items: center;
    gap: 5px;
    height: 25px;
  `,
  PageText: styled.Text<{$isDisabled: boolean}>`
    font-size: 15px;
    color: ${$isDisabled =>
      $isDisabled ? colors.Grayscale.BLACK : colors.Grayscale.GRAY_300};
  `,
};

export default Pagination;
