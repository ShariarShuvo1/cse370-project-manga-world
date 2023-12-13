package com.amakakeru.mangaworld.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
@Table(name = "rate")
public class Rate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "r_id")
    private Long rid;

    @Column(name = "r_value", nullable = false, columnDefinition = "DECIMAL(2,1)")
    private BigDecimal rvalue;

    @Column(name = "r_date", nullable = false)
    private java.sql.Timestamp rdate;

    @Column(name = "r_comment", length = 5120)
    private String rcomment;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "m_id")
    private Manga manga;
}
