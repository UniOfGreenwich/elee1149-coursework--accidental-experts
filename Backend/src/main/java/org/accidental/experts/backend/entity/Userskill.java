package org.accidental.experts.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "userskills")
public class Userskill {
    @SequenceGenerator(name = "userskills_id_gen", sequenceName = "users_user_id_seq", allocationSize = 1)
    @EmbeddedId
    private UserskillId id;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @MapsId("skillId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    public UserskillId getId() {
        return id;
    }

    public void setId(UserskillId id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Skill getSkill() {
        return skill;
    }

    public void setSkill(Skill skill) {
        this.skill = skill;
    }

}