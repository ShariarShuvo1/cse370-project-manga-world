package com.amakakeru.mangaworld.Controller;

import com.amakakeru.mangaworld.Entity.*;
import com.amakakeru.mangaworld.Entity.Combined.SearchComponent;
import com.amakakeru.mangaworld.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.sql.Timestamp;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class SearchComponentController {

    @Autowired
    private MangaRepository mangaRepository;

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private PublisherRepository publisherRepository;

    @Autowired
    private VolumeRepository volumeRepository;

    @Autowired
    private MangaController mangaController;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SearchHistoryRepository searchHistoryRepository;

    public static List<String> extractWords(String input) {
        List<String> words = new ArrayList<>();
        Pattern pattern = Pattern.compile("\\b\\w+\\b");
        Matcher matcher = pattern.matcher(input);
        while (matcher.find()) {
            words.add(matcher.group());
        }
        return words;
    }

    @PostMapping("/search/{userId}")
    public SearchComponent search(@PathVariable String userId, @RequestBody String keyword) {
        try {
            String decodedString = URLDecoder.decode(keyword, "UTF-8");
            keyword = decodedString.substring(0, decodedString.length() - 1);
            if (!Objects.equals(userId, "0")) {
                User user = userRepository.findUserByUserId(Long.parseLong(userId));
                SearchHistory searchHistory = new SearchHistory();
                searchHistory.setShSearch(keyword);
                searchHistory.setUser(user);
                long currentTimeMillis = System.currentTimeMillis();
                Timestamp timestamp = new Timestamp(currentTimeMillis);
                searchHistory.setShDate(timestamp);
                searchHistoryRepository.save(searchHistory);
            }


            List<String> tempKeywords = mangaController.getKeywordsFromSearchHistory(keyword);
            List<String> keyWords;
            if (tempKeywords.size() < 2) {
                keyWords = extractWords(keyword);
            } else {
                keyWords = tempKeywords;
            }
            HashMap<Manga, Integer> mangas = new HashMap<>();
            List<Manga> tempManga = new ArrayList<>();

            for (String key : keyWords) {
                tempManga.addAll(mangaRepository.findAllByMtitleContainingIgnoreCase(key));
                tempManga.addAll(mangaRepository.findAllByMdescriptionContainingIgnoreCase(key));
                List<Volume> tempVolumes = volumeRepository.findAllByVtitleContainingIgnoreCase(key);
                tempVolumes.forEach(volume -> tempManga.add(volume.getManga()));
            }
            for (Manga manga : tempManga) {
                if (mangas.containsKey(manga)) {
                    mangas.put(manga, mangas.get(manga) + 1);
                } else {
                    mangas.put(manga, 1);
                }
            }

            List<Map.Entry<Manga, Integer>> entryList = new ArrayList<>(mangas.entrySet());
            entryList.sort(Map.Entry.<Manga, Integer>comparingByValue().reversed());

            List<Manga> sortedMangaList = entryList.stream()
                    .map(Map.Entry::getKey)
                    .collect(Collectors.toList());

            HashMap<Author, Integer> authors = new HashMap<>();
            List<Author> tempAuthors = new ArrayList<>();
            for (String key : keyWords) {
                tempAuthors.addAll(authorRepository.findAllByAnameContainingIgnoreCase(key));
                tempAuthors.addAll(authorRepository.findAllByAdescriptionContainingIgnoreCase(key));
            }

            for (Author author : tempAuthors) {
                if (authors.containsKey(author)) {
                    authors.put(author, authors.get(author) + 1);
                } else {
                    authors.put(author, 1);
                }
            }

            HashMap<Publisher, Integer> publishers = new HashMap<>();
            List<Publisher> tempPublisher = new ArrayList<>();
            for (String key : keyWords) {
                tempPublisher.addAll(publisherRepository.findAllByPnameContainingIgnoreCase(key));
                tempPublisher.addAll(publisherRepository.findAllByPdescriptionContainingIgnoreCase(key));
            }
            for (Publisher publisher : tempPublisher) {
                if (publishers.containsKey(publisher)) {
                    publishers.put(publisher, publishers.get(publisher) + 1);
                } else {
                    publishers.put(publisher, 1);
                }
            }
            for (Manga manga : sortedMangaList) {
                for (AuthorManga authorManga : manga.getAuthorMangas()) {
                    if (authors.containsKey(authorManga.getAuthor())) {
                        authors.put(authorManga.getAuthor(), authors.get(authorManga.getAuthor()) + 1);
                    } else {
                        authors.put(authorManga.getAuthor(), 1);
                    }
                }
                for (PublisherManga publisherManga : manga.getPublisherMangas()) {
                    if (publishers.containsKey(publisherManga.getPublisher())) {
                        publishers.put(publisherManga.getPublisher(), publishers.get(publisherManga.getPublisher()) + 1);
                    } else {
                        publishers.put(publisherManga.getPublisher(), 1);
                    }
                }
            }
            List<Map.Entry<Author, Integer>> authorEntryList = new ArrayList<>(authors.entrySet());
            authorEntryList.sort(Map.Entry.<Author, Integer>comparingByValue().reversed());

            List<Author> sortedAuthorList = authorEntryList.stream()
                    .map(Map.Entry::getKey)
                    .collect(Collectors.toList());

            List<Map.Entry<Publisher, Integer>> publisherEntryList = new ArrayList<>(publishers.entrySet());
            publisherEntryList.sort(Map.Entry.<Publisher, Integer>comparingByValue().reversed());

            List<Publisher> sortedPublisherList = publisherEntryList.stream()
                    .map(Map.Entry::getKey)
                    .collect(Collectors.toList());
            SearchComponent searchComponent = new SearchComponent();
            searchComponent.setMangas(sortedMangaList);
            searchComponent.setAuthors(sortedAuthorList);
            searchComponent.setPublishers(sortedPublisherList);
            return searchComponent;
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return new SearchComponent();
        }
    }
}
