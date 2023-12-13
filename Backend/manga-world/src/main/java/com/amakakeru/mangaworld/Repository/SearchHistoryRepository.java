package com.amakakeru.mangaworld.Repository;

import com.amakakeru.mangaworld.Entity.SearchHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@Repository
public interface SearchHistoryRepository extends JpaRepository<SearchHistory, Long> {


    @Query(value = "SELECT * FROM search_history WHERE user_id = ?1 ORDER BY sh_date DESC LIMIT 10", nativeQuery = true)
    List<SearchHistory> getLastTenSearchByUserId(Long userId);
}
