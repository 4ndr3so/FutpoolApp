package com.futbolapp.back.models;

import java.util.List;
import java.util.Map;


public class Tournament{
    private String id;
    private String name;
    private String ownerId;
    private Map<String, Object> rules;
    private List<String> participants;   
}
