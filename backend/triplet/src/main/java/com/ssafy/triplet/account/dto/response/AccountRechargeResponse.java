package com.ssafy.triplet.account.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AccountRechargeResponse {
    private String accountNumber;
    private double accountBalance;
}
