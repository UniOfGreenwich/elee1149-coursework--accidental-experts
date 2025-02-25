package org.accidental.experts.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import org.hibernate.Hibernate;

import java.io.Serial;
import java.util.Objects;

@Embeddable
public class UserskillId implements java.io.Serializable {
    @Serial
    private static final long serialVersionUID = 2204263268290224490L;
    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "skill_id", nullable = false)
    private Integer skillId;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getSkillId() {
        return skillId;
    }

    public void setSkillId(Integer skillId) {
        this.skillId = skillId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        UserskillId entity = (UserskillId) o;
        return Objects.equals(this.skillId, entity.skillId) &&
                Objects.equals(this.userId, entity.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(skillId, userId);
    }

}