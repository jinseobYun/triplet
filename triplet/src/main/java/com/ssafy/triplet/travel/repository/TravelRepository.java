package com.ssafy.triplet.travel.repository;

import com.ssafy.triplet.travel.entity.Travel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TravelRepository extends JpaRepository<Travel, Long> {
    // 여행 ID로 조회하는 메소드 등을 추가할 수 있음
}