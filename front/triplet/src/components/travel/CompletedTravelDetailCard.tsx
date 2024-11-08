import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as RemoveIcon} from '../../assets/travel/removeIcon.svg';
import useAxios from '../../hooks/useAxios';
import RemoveModal from '../modal/RemoveModal';
import { ReactComponent as ExitIcon } from '../../assets/travel/doorExit.svg';

import ExitTravelModal from '../modal/ExitTravelModal';
import { useParams } from 'react-router-dom';


const PositionDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color : white;
    border-radius : 20px;
`;

const CardDiv = styled.div`
    width: 100%;
    height: 120px;
    border-radius: 20px;
    position: relative;
    overflow: hidden;
`;

const TitleP = styled.p`
    position: absolute;
    bottom: 55px; 
    left: 20px;
    z-index: 2;
    font-weight: 700;
    font-size: 20px;
    color: black;
`;

const InfoP = styled.p`
    position: absolute;
    bottom: 5px; /* TitleP 아래에 위치 */
    left: 20px;
    z-index: 2;
    font-size: 16px;
    color: #666666;
`;

const PriceInfo = styled.div`
    position: absolute;
    bottom: 10px; /* 하단에 딱 붙지 않도록 여백 추가 */
    right: 20px;  /* 왼쪽으로 이동해서 정렬 */
    z-index: 2;
    font-size: 16px;
    display: flex; /* Flexbox 사용 */
    flex-direction: row; /* 자식 요소를 가로로 배치 */
    align-items: center; /* 자식 요소를 수직으로 가운데 정렬 */
`;

const Remove = styled(RemoveIcon)`
    position: absolute;
    bottom: 74px; 
    right: 20px;
`;

const PriceInfoP = styled.p`
    font-weight : 300;
    color : #666666;
`;

const Exit = styled(ExitIcon)`
    position: absolute;
    bottom: 125px; 
    right: 20px;
`;

interface TravelDetailCardProps {
    travelId : number,
    title : String,
    startDate : String,
    endDate : String,
    country : String,
    memberCount : number,
    usedBudget : number,
    creatorId : number,
}

const CompletedTravelDetailCard: React.FC<TravelDetailCardProps> = 
        ({ travelId, title, startDate, endDate, country, memberCount, usedBudget, creatorId}) => {

    const [ removeOpen, setRemoveOpen ] = useState(false);
    const [ exitOpen, setExitOpen ] = useState(false);

    const { data : creatorData, error : creatorError, status : creatorStatus,
        refetch : creatorRefetch
    } = useAxios(`travels/confirm/${travelId}`,"GET");

    const [ creator, setCreator ] = useState(false);

    useEffect(()=>{
        if(travelId!==0){
            creatorRefetch();
        }
    },[travelId])
    useEffect(()=>{

        if(creatorData && creatorStatus===200){
            setCreator(creatorData.data);
        }

    },[creatorData, creatorError]);
    
    const exit = () => {
        setExitOpen(true);
    }

    const remove = () => {
        setRemoveOpen(true);
    }

    return (
        <PositionDiv>
            <CardDiv>
                <TitleP>{title}</TitleP>
                { creator ? (
                    <Remove onClick={remove} />
                ) : (
                    <Exit onClick={exit} />
                )}
                <InfoP> { startDate} ~
                {endDate}<br />{country} · {memberCount}명</InfoP>
                <PriceInfo>
                        <PriceInfoP>{usedBudget}원</PriceInfoP>
                </PriceInfo>
            </CardDiv>
            <RemoveModal isOpen={removeOpen} onClose={() => {setRemoveOpen(false)}} travelId={travelId} creatorId={creatorId}/>
            <ExitTravelModal isOpen={exitOpen} onClose={() => {setExitOpen(false)}} travelId={travelId} />
        </PositionDiv>
    );
};

export default CompletedTravelDetailCard;
