package com.amakakeru.mangaworld.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Objects;

@Data
@Entity
@Table(name = "manga")
public class Manga {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "m_id")
    private Long mid;

    @Column(name = "m_title", nullable = false)
    private String mtitle;

    @Column(name = "m_status", nullable = false)
    private String mstatus;

    @Column(name = "m_publish_date", nullable = false)
    private java.sql.Date mpublishDate;

    @Column(name = "m_view", nullable = false, columnDefinition = "int default 0")
    private int mview;

    @Column(name = "m_description", nullable = false, length = 5120)
    private String mdescription;

    @JsonIgnore
    @OneToOne(mappedBy = "manga", cascade = CascadeType.ALL, orphanRemoval = true)
    private MangaPicture mangaPicture;

    @JsonIgnore
    @OneToMany(mappedBy = "manga", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Volume> volumes;

    @JsonIgnore
    @OneToMany(mappedBy = "manga", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Rate> rates;

    @JsonIgnore
    @OneToMany(mappedBy = "manga", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AlreadyRead> alreadyReadList;

    @JsonIgnore
    @OneToMany(mappedBy = "manga", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Wishlist> wishlist;

    @JsonIgnore
    @OneToMany(mappedBy = "manga", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Ongoing> ongoingList;

    @JsonIgnore
    @OneToMany(mappedBy = "manga", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CategoryManga> categoryMangas;

    @JsonIgnore
    @OneToMany(mappedBy = "manga", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AuthorManga> authorMangas;

    @JsonIgnore
    @OneToMany(mappedBy = "manga", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PublisherManga> publisherMangas;

    @Override
    public int hashCode() {
        return Objects.hash(mid, mtitle, mstatus, mpublishDate, mview, mdescription);
    }

    @Override
    public String toString() {
        return "Manga{" +
                "mid=" + mid +
                ", mtitle='" + mtitle + '\'' +
                ", mstatus='" + mstatus + '\'' +
                ", mpublishDate=" + mpublishDate +
                ", mview=" + mview +
                ", mdescription='" + mdescription + '\'' +
                '}';
    }

}
