package com.futbolapp.back.models;

import java.util.List;

public class Trade {
    private String id;
    private String requesterId;
    private String receiverId;
    private List<Sticker> stickersOffered;
    private List<Sticker> stickersRequested;
    //private TradeStatus status; // ENUM: PENDING, ACCEPTED, DECLINED
}