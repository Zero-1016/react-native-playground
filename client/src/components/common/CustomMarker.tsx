import {LatLng, Marker, MyMarkerProps} from 'react-native-maps';
import styled from '@emotion/native';
import {MarkerColor} from '@/types/domain';
import {colors} from '@/styles/theme/colors';

interface CustomMarkerProps extends MyMarkerProps {
  coordinate?: LatLng;
  color: MarkerColor;
  score?: number;
}

export const colorHex = {
  RED: colors.Brand.PINK_400,
  BLUE: colors.Brand.BLUE_400,
  GREEN: colors.Brand.GREEN_400,
  YELLOW: colors.Brand.YELLOW_400,
  PURPLE: colors.Brand.PURPLE_400,
};

function CustomMarker({
  coordinate,
  color,
  score = 5,
  ...props
}: CustomMarkerProps) {
  const markerView = (
    <S.Container>
      <S.MarkerStyled $color={color}>
        <S.Eye $position="left" />
        <S.Eye $position="right" />
        {score > 3 && <M.Good />}
        {score === 3 && <M.SoSo />}
        {score < 3 && <M.Bad />}
      </S.MarkerStyled>
    </S.Container>
  );

  return coordinate ? (
    <Marker coordinate={coordinate} {...props}>
      {markerView}
    </Marker>
  ) : (
    markerView
  );
}

const S = {
  Container: styled.View`
    height: 35px;
    width: 32px;
    align-items: center;
  `,
  MarkerStyled: styled.View<{$color: MarkerColor}>`
    transform: rotate(45deg);
    width: 27px;
    height: 27px;
    border-radius: 27px 27px 1px 27px;
    border-width: 1px;
    border-color: ${colors.Grayscale.BLACK};
    background-color: ${({$color}) => colorHex[$color]};
    position: relative;
  `,
  Eye: styled.View<{$position: 'left' | 'right'}>`
    position: absolute;
    background-color: ${colors.Grayscale.BLACK};
    width: 4px;
    height: 4px;
    border-radius: 2px;
    top: ${({$position}) => ($position === 'left' ? 12 : 5) + 'px'};
    left: ${({$position}) => ($position === 'left' ? 5 : 12) + 'px'};
  `,
  Mouth: styled.View`
    position: absolute;
    width: 12px;
    height: 12px;
    border-style: solid;
    border-width: 1px;
    border-radius: 12px;
    border-top-color: rgba(255, 255, 255, 0.01);
    border-bottom-color: rgba(255, 255, 255, 0.01);
  `,
};

const M = {
  Good: styled(S.Mouth)`
    transform: rotate(225deg);
    margin-left: 5px;
    margin-top: 5px;
    border-right-color: rgba(255, 255, 255, 0.01);
    border-left-color: ${colors.Grayscale.BLACK};
  `,
  SoSo: styled.View`
    margin-left: 13px;
    margin-top: 13px;
    width: 8px;
    height: 8px;
    border-left-color: ${colors.Grayscale.BLACK};
    border-left-width: 1px;
    transform: rotate(45deg);
  `,
  Bad: styled(S.Mouth)`
    transform: rotate(45deg);
    margin-left: 12px;
    margin-top: 12px;
    border-right-color: rgba(255, 255, 255, 0.01);
    border-left-color: ${colors.Grayscale.BLACK};
  `,
};

export default CustomMarker;
