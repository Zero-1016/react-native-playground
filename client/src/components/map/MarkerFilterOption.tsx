import {CompoundOption} from '@/components/common/CompoundOption';
import {useState} from 'react';
import {categoryList} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import styled from '@emotion/native';
import {colorHex} from '@/styles/theme/colors';
import useMarkerFilter from '@/hooks/useMarkerFilter';

interface MarkerFilterOptionProps {
  isVisible: boolean;
  hideOption: () => void;
}

type Condition = '색상' | '평점';

const ConditionArray: Condition[] = ['색상', '평점'];

function MarkerFilterOption({isVisible, hideOption}: MarkerFilterOptionProps) {
  const [filterCondition, setFilterCondition] = useState<Condition>('색상');
  const {getProfileQuery} = useAuth();
  const handleCondition = (condition: Condition) => {
    setFilterCondition(condition);
  };
  const markerFilter = useMarkerFilter();

  const handleFilter = (name: string) => {
    markerFilter.set({
      ...markerFilter.items,
      [name]: !markerFilter.items[name],
    });
  };

  const {categories} = getProfileQuery.data || {};
  return (
    <CompoundOption isVisible={isVisible} hideOption={hideOption}>
      <CompoundOption.BackGround>
        <CompoundOption.Container>
          <CompoundOption.Title>마커 필터링</CompoundOption.Title>
          <CompoundOption.Divider />
          <S.FilterContainer>
            {ConditionArray.map(condition => (
              <CompoundOption.Filter
                key={condition}
                isSelected={filterCondition === condition}
                onPress={() => handleCondition(condition)}>
                {condition}
              </CompoundOption.Filter>
            ))}
          </S.FilterContainer>
          <CompoundOption.Divider />

          {filterCondition === '색상' && (
            <>
              {categoryList.map(color => (
                <CompoundOption.CheckBox
                  key={color}
                  isChecked={markerFilter.items[color]}
                  onPress={() => handleFilter(color)}
                  icon={<S.Marker $backgroundColor={colorHex[color]} />}>
                  {categories?.[color]}
                </CompoundOption.CheckBox>
              ))}
            </>
          )}

          {filterCondition === '평점' && (
            <>
              {['1', '2', '3', '4', '5'].map(score => (
                <CompoundOption.CheckBox
                  key={score}
                  isChecked={markerFilter.items[score]}
                  onPress={() => handleFilter(score)}>
                  {score} 점
                </CompoundOption.CheckBox>
              ))}
            </>
          )}

          <CompoundOption.Divider />
          <CompoundOption.Button onPress={hideOption}>
            완료
          </CompoundOption.Button>
        </CompoundOption.Container>
      </CompoundOption.BackGround>
    </CompoundOption>
  );
}

const S = {
  Marker: styled.View<{$backgroundColor: string}>`
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background-color: ${({$backgroundColor}) => $backgroundColor};
  `,
  FilterContainer: styled.View`
    flex-direction: row;
    padding: 0 15px;
    justify-content: space-around;
  `,
};

export default MarkerFilterOption;
