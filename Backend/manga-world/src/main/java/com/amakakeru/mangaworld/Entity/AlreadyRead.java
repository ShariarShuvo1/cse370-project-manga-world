package com.amakakeru.mangaworld.Entity;

import com.amakakeru.mangaworld.Entity.IdClasses.AlreadyReadId;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@IdClass(AlreadyReadId.class)
@Table(name = "already_read")
public class AlreadyRead {

    @Id
    @Column(name = "user_id")
    private Long userId;

    @Id
    @Column(name = "m_id")
    private Long mid;

    @Column(name = "added_date", nullable = false)
    private java.sql.Timestamp addedDate;

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "m_id", insertable = false, updatable = false)
    private Manga manga;
}