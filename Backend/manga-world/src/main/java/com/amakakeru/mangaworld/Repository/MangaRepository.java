package com.amakakeru.mangaworld.Repository;

import com.amakakeru.mangaworld.Entity.Manga;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@Repository
public interface MangaRepository extends JpaRepository<Manga, Long> {

    @Query(value = "select * from manga ORDER BY m_view desc LIMIT 10", nativeQuery = true)
    List<Manga> getMangasForPlaceholder();

    @Query(value = "select * from manga ORDER BY m_view desc LIMIT 15", nativeQuery = true)
    List<Manga> getMostViewedManga();

    @Query(value = "SELECT m.*, SUM(r.r_value) AS total_r_value FROM manga m JOIN rate r ON m.m_id = r.m_id GROUP BY m.m_id ORDER BY total_r_value DESC LIMIT 15", nativeQuery = true)
    List<Manga> getMostRatedManga();

    @Query(value = "select * from manga ORDER BY m_publish_date desc LIMIT 15", nativeQuery = true)
    List<Manga> getNewManga();

    @Query(value = "SELECT m.*, COUNT(ar.m_id) AS read_count FROM manga m JOIN already_read ar ON m.m_id = ar.m_id GROUP BY m.m_id, m.m_title ORDER BY read_count DESC LIMIT 15", nativeQuery = true)
    List<Manga> getMostReadMangas();

    @Query(value = "SELECT COUNT(*) AS total_manga FROM manga", nativeQuery = true)
    Integer allMangaCount();

    //    @Query(value = "SELECT * FROM manga  WHERE LOWER(m_title) LIKE ?1 OR LOWER(m_description) LIKE ?1", nativeQuery = true)
    List<Manga> findAllByMtitleContainingIgnoreCaseOrMdescriptionContainingIgnoreCase(String title, String description, Pageable pageable);

    //@Query(value = "SELECT * FROM manga  WHERE LOWER(m_title) LIKE ?1 OR LOWER(m_description) LIKE ?1", nativeQuery = true)
    List<Manga> findAllByMtitleContainingIgnoreCase(String keyword, Pageable pageable);

    //    @Query(value = "SELECT * FROM manga  WHERE LOWER(m_title) LIKE ?1 OR LOWER(m_description) LIKE ?1", nativeQuery = true)
    List<Manga> findAllByMtitleContainingIgnoreCase(String keyword);

    //    @Query(value = "SELECT * FROM manga  WHERE LOWER(m_description) LIKE ?1", nativeQuery = true)
    List<Manga> findAllByMdescriptionContainingIgnoreCase(String keyword);

    //    @Query(value = "SELECT * FROM manga  WHERE LOWER(m_title) LIKE ?1 OR LOWER(m_description) LIKE ?1", nativeQuery = true)
    Manga findMangaByMid(Long mangaId);
}
