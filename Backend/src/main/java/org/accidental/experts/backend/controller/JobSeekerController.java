package org.accidental.experts.backend.controller;

import org.accidental.experts.backend.entity.AccountInfoResponse;
import org.accidental.experts.backend.service.AccountInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/accountInfo")
public class JobSeekerController {

    @Autowired
    private AccountInfoService accountInfoService;

    @GetMapping("/{id}")
    public ResponseEntity<AccountInfoResponse> getAccountInfo(@PathVariable Integer id) {
        Optional<AccountInfoResponse> accountInfoResponse = accountInfoService.getAccountInfo(id);
        return accountInfoResponse.map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());
    }
}
