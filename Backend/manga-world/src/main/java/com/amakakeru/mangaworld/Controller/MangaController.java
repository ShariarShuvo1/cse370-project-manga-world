package com.amakakeru.mangaworld.Controller;


import com.amakakeru.mangaworld.Controller.NlpModels.KeywordExtractor;
import com.amakakeru.mangaworld.Entity.*;
import com.amakakeru.mangaworld.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.URLDecoder;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class MangaController {

    @Autowired
    private MangaRepository mangaRepository;

    @Autowired
    private RateRepository rateRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SearchHistoryRepository searchHistoryRepository;

    @Autowired
    private CategoryMangaRepository categoryMangaRepository;

    @GetMapping("/mangas/getAllMangaNames")
    public List<String> getAllMangaNames() {
        List<Manga> mangas = mangaRepository.getMangasForPlaceholder();
        List<String> mangaNames = new ArrayList<>();
        for (Manga manga : mangas) {
            mangaNames.add(manga.getMtitle());
        }
        return mangaNames;
    }

    @GetMapping("/mangas/getMostViewedManga")
    public List<Manga> getMostViewedManga() {
        return mangaRepository.getMostViewedManga();
    }

    @GetMapping("/mangas/getMostRatedManga")
    public List<Manga> getMostRatedManga() {
        return mangaRepository.getMostRatedManga();
    }

    @GetMapping("/mangas/getNewManga")
    public List<Manga> getNewManga() {
        return mangaRepository.getNewManga();
    }

    @GetMapping("/mangas/getMostReadMangas")
    public List<Manga> getMostReadMangas() {
        return mangaRepository.getMostReadMangas();
    }

    @GetMapping("/mangas/getTodayPickMangas")
    public List<Manga> getTodayPickMangas() throws Exception {
        Integer totalMangaCount = mangaRepository.allMangaCount();
        List<Manga> mangas = new ArrayList<>();
        if (totalMangaCount < 50) {
            return mangaRepository.findAll();
        } else {
            while (mangas.size() != 50) {
                Random random = new Random();
                int min = 1;
                int max = totalMangaCount;
                int randomValueInRange = random.nextInt(max - min + 1) + min;
                Optional<Manga> mangaOptional = mangaRepository.findById((long) randomValueInRange);
                if (mangaOptional.isPresent()) {
                    Manga manga = mangaOptional.get();
                    if (!mangas.contains(manga)) {
                        mangas.add(manga);
                    }
                }
            }
        }
        return mangas;
    }

    public List<String> getKeywordsFromSearchHistory(String text) {
        try {
            KeywordExtractor extractor = new KeywordExtractor("src/main/java/com/amakakeru/mangaworld/Controller/NlpModels/en-token.bin", "src/main/java/com/amakakeru/mangaworld/Controller/NlpModels/en-pos-maxent.bin");
            return extractor.extractKeywords(text);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ArrayList<String>();
    }

    @GetMapping("/mangas/getBasedOnLastSearch/{userId}")
    public List<Manga> getBasedOnLastSearch(@PathVariable String userId) throws Exception {
        Optional<User> userOptional = userRepository.findById(Long.parseLong(userId));
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            List<SearchHistory> searchHistories = searchHistoryRepository.getLastTenSearchByUserId(user.getUserId());
            List<String> keywords = new ArrayList<>();
            for (SearchHistory searchHistory : searchHistories) {
                keywords.addAll(getKeywordsFromSearchHistory(searchHistory.getShSearch()));
            }
            List<Manga> mangas = new ArrayList<>();
            for (String keyword : keywords) {
                Pageable pageable = PageRequest.of(0, 50);
                List<Manga> mangaList = mangaRepository.findAllByMtitleContainingIgnoreCaseOrMdescriptionContainingIgnoreCase(keyword, keyword, pageable);
                for (Manga manga : mangaList) {
                    if (!mangas.contains(manga)) {
                        mangas.add(manga);
                    }
                }
            }
            Collections.shuffle(mangas);
            if (mangas.size() > 50) {
                return mangas.subList(0, 50);
            } else {
                return mangas;
            }

        }
        return getTodayPickMangas();
    }

    @PostMapping("/mangas/getMostViewedCountBasedOnCategory")
    public Integer getMostViewedCountBasedOnCategory(@RequestBody Category category) {
        List<CategoryManga> categoryMangas = categoryMangaRepository.findCategoryMangaCountByCategory(category);
        return categoryMangas.size();
    }

    @PostMapping("/mangas/getMostViewedBasedOnCategory/{pageNumber}")
    public List<Manga> getMostViewedBasedOnCategory(@PathVariable String pageNumber, @RequestBody Category category) {
        Pageable pageable = PageRequest.of(Integer.parseInt(pageNumber), 15);
        List<CategoryManga> categoryMangas = categoryMangaRepository.findCategoryMangaByCategory(category, pageable);
        List<Manga> mangas = new ArrayList<>();
        for (CategoryManga categoryManga : categoryMangas) {
            mangas.add(categoryManga.getManga());
        }
        return mangas;
    }

    @PostMapping("/mangas/addNewManga")
    public Manga addNewManga(@RequestBody Manga manga) {
        return mangaRepository.save(manga);
    }

    @PostMapping("/mangas/searchByKeyword")
    public List<Manga> searchByKeyword(@RequestBody String keyword) {
        try {
            String decodedString = URLDecoder.decode(keyword, "UTF-8");
            decodedString = decodedString.substring(0, decodedString.length() - 1);
            Pageable pageable = PageRequest.of(0, 10);
            return mangaRepository.findAllByMtitleContainingIgnoreCase(decodedString, pageable);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    @PostMapping("/mangas/viewIncrement")
    public void viewIncrement(@RequestBody Manga manga) {
        Optional<Manga> manga1 = mangaRepository.findById(manga.getMid());
        if (manga1.isPresent()) {
            manga1.get().setMview(manga1.get().getMview() + 1);
            mangaRepository.save(manga1.get());
        }
    }

    @PostMapping("/mangas/getAverageRating")
    public BigDecimal getAverageRating(@RequestBody Manga manga) {
        List<Rate> rates = rateRepository.findAllByManga(manga);
        BigDecimal totalRating = BigDecimal.valueOf(0.0);

        for (Rate rate : rates) {
            totalRating = totalRating.add(rate.getRvalue());
        }

        if (!rates.isEmpty()) {
            return totalRating.divide(BigDecimal.valueOf(rates.size()), 1, RoundingMode.HALF_UP);
        } else {
            return BigDecimal.ZERO;
        }
    }

    @PostMapping("/mangas/getTotalRating")
    public Integer getTotalRating(@RequestBody Manga manga) {
        List<Rate> rates = rateRepository.findAllByManga(manga);
        return rates.size();
    }

    @DeleteMapping("/mangas/deleteManga/{mangaId}")
    public void deleteManga(@PathVariable String mangaId) {
        Manga manga = mangaRepository.findMangaByMid(Long.parseLong(mangaId));
        mangaRepository.delete(manga);
    }
}
