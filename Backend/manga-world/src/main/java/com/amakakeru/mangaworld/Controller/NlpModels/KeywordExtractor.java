package com.amakakeru.mangaworld.Controller.NlpModels;

import opennlp.tools.postag.POSModel;
import opennlp.tools.postag.POSTaggerME;
import opennlp.tools.tokenize.Tokenizer;
import opennlp.tools.tokenize.TokenizerME;
import opennlp.tools.tokenize.TokenizerModel;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class KeywordExtractor {

    private Tokenizer tokenizer;
    private POSTaggerME posTagger;

    public KeywordExtractor(String tokenizerModelPath, String posModelPath) throws IOException {
        try (InputStream tokenModelIn = new FileInputStream(tokenizerModelPath);
             InputStream posModelIn = new FileInputStream(posModelPath)) {

            TokenizerModel tokenModel = new TokenizerModel(tokenModelIn);
            tokenizer = new TokenizerME(tokenModel);

            POSModel posModel = new POSModel(posModelIn);
            posTagger = new POSTaggerME(posModel);
        }
    }

    public List<String> extractKeywords(String text) {
        String[] tokens = tokenizer.tokenize(text);
        String[] tags = posTagger.tag(tokens);

        List<String> keywords = new ArrayList<>();
        for (int i = 0; i < tags.length; i++) {
            if (tags[i].startsWith("NN")) {
                keywords.add(tokens[i]);
            }
        }
        return keywords;
    }
}
