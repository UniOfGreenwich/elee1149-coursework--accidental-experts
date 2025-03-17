package org.accidental.experts.backend.entity;

import java.util.List;

public class AccountInfoResponse {
    private User profile;
    private List<AppliedJobInfo> applied;

    public User getProfile() {
        return profile;
    }

    public void setProfile(User profile) {
        this.profile = profile;
    }

    public List<AppliedJobInfo> getApplied() {
        return applied;
    }

    public void setApplied(List<AppliedJobInfo> applied) {
        this.applied = applied;
    }
}
