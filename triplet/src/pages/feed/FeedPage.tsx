import React, {useEffect, useState} from 'react';
import Header from '../../components/header/Header';
import { useDispatch } from 'react-redux';
import { pageMove } from '../../features/navigation/naviSlice';
import styled from 'styled-components';

import useAxios from '../../hooks/useAxios';
import useInput from '../../hooks/useInput';
import { ReactComponent as Search } from '../../assets/common/search.svg';
import { ReactComponent as ArrowDown } from '../../assets/common/arrowDown.svg';
import { ReactComponent as Filter } from '../../assets/common/filter.svg';

import SnsTravelCardMini from '../../components/travel/SnsTravelCardMini';
import DetailSearchBottomSheet from '../../components/travel/DetailSearchBottomSheet';

const FeedDiv = styled.div`
    background-color : #F3F4F6;
    min-height: calc(100vh - 112px);
    padding : 0 16px 0;
    margin : 56px 0 56px 0;
`;

const TitleDiv = styled.div`
    margin-top : 8px;
`;

const TitleP = styled.p`
    font-size : 20px;
    font-weight : 800;
    margin : 12px 0px 0;
`;

const TitleExplainP = styled.p`
    font-size : 16px;
    font-weight : 600;
    color : #008DE7;
    margin : 8px 0 0 0;
`;

const SearchDiv = styled.p`
    margin-top:40px;
    position: relative;
    display: flex;
    align-items: center;
`

const SearchWrapper = styled.div`
    position: absolute;
    left: 10px;
    display: flex;
    align-items: center;
    height: 100%;
`

const FilterWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 4px; /* 텍스트와 아이콘 사이에 간격 */
`

const SearchInput = styled.input`
    width : 100%;
    height : 44px;
    background-color : white;
    color : black;
    border : 1px solid #F0F0F0;
    border-radius : 50px;
    text-indent : 30px;

    &::placeholder {
    color : #AEAEAE; 
    }
`

const FilterDiv = styled.div`
    margin-top : 12px;
    display : flex;
    justify-content : space-between;
`;

const FilterDownDiv = styled.div`
    display : flex;
    flex-direction : row;
    text-align : center;
    align-items : center;
    gap : 4px;
`

const FilterP = styled.p`
    font-size : 14px;
    font-weight : 500;
    color : #008DE7;
`;

const FilterBtn = styled.button`
    display: flex;
    align-items: center;
    width: 86px;
    height : 37px;
    background-color : #E6F2FF;
    color : #008DE7;
    border : none;
    border-radius : 50px;
    padding : 12px;
    font-size : 12px;
    font-weight : 500;

    &:hover {
        background-color: #D0E8FF;
    }
`;

const TravelDiv = styled.div`
    margin-top: 12px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(156px, 1fr));
    gap: 16px; /* 카드 사이에 16px의 간격 추가 */
    place-items: center; /* 가로, 세로축 모두 중앙 정렬 */
    justify-content: start; /* 왼쪽에서부터 아이템을 정렬 */
    margin-bottom: 26px;

    /* 그리드가 최소 2개의 열을 유지하도록 설정 */
    @media (min-width: 360px) {
        grid-template-columns: repeat(2, minmax(156px, 1fr));
    }

    @media (min-width: 768px) {
        grid-template-columns: repeat(auto-fit, minmax(156px, 1fr));
    }
`;


const FeedPAge = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(pageMove("feed"));
    }, [])

    const valid = (value:string) => {
        const regex = /^[가-힣]*$/;
        return regex.test(value);
    }

    const country = useInput(valid);

    const [ isBottomSheetOpen, setIsBottomSheetOpen ] = useState(false);

    return (
        <>
            <Header/>
            <FeedDiv>
                <TitleDiv>
                    <TitleP>여행 피드</TitleP>
                    <TitleExplainP>가고 싶은 여행지를 찾아보세요.</TitleExplainP>
                </TitleDiv>
                <SearchDiv>
                    <SearchWrapper>
                        <Search/>                        
                    </SearchWrapper>
                    <SearchInput placeholder='여행지를 입력하세요.'></SearchInput>
                </SearchDiv>
                <FilterDiv>
                    <FilterDownDiv>
                        <FilterP>추천순</FilterP>
                        <ArrowDown/>
                    </FilterDownDiv>
                    <FilterDownDiv>
                        <FilterBtn onClick={() => setIsBottomSheetOpen(true)}>
                        <FilterWrapper>
                            <Filter width={16} height={16}/>
                        </FilterWrapper>
                        상세검색</FilterBtn>
                    </FilterDownDiv>
                </FilterDiv>
                <TravelDiv>
                    <SnsTravelCardMini></SnsTravelCardMini>
                    <SnsTravelCardMini></SnsTravelCardMini>
                    <SnsTravelCardMini></SnsTravelCardMini>
                    <SnsTravelCardMini></SnsTravelCardMini>
                    <SnsTravelCardMini></SnsTravelCardMini>
                    <SnsTravelCardMini></SnsTravelCardMini>
                </TravelDiv>
                <DetailSearchBottomSheet isOpen={isBottomSheetOpen} 
            onClose={() => setIsBottomSheetOpen(false)}></DetailSearchBottomSheet>
            </FeedDiv>
        </>
    );
};

export default FeedPAge;