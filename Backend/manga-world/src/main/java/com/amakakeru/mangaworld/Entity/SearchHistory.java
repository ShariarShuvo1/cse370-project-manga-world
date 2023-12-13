package com.amakakeru.mangaworld.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "search_history")
public class SearchHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sh_id")
    private Long shId;

    @Column(name = "sh_date", nullable = false)
    private java.sql.Timestamp shDate;

    @Column(name = "sh_search", nullable = false)
    private String shSearch;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Override
    public String toString() {
        return "SearchHistory{" +
                "shId=" + shId +
                ", shDate=" + shDate +
                ", shSearch='" + shSearch + '\'' +
                ", user=" + user +
                '}';
    }
}
