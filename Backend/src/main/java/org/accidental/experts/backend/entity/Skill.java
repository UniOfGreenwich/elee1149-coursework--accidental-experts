package org.accidental.experts.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "skills")
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "skills_id_gen")
    @SequenceGenerator(name = "skills_id_gen", sequenceName = "skills_skill_id_seq", allocationSize = 1)
    @Column(name = "skill_id", nullable = false)
    private Integer id;

    @Column(name = "skill_name", nullable = false)
    private String skillName;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSkillName() {
        return skillName;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }

}