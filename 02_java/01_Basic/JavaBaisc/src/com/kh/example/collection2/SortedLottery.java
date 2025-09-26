package com.kh.example.collection2;

import java.util.Comparator;

public class SortedLottery implements Comparator<Lottery> {

    @Override
    public int compare(Lottery o1, Lottery o2) {
        int result = o1.getName().compareToIgnoreCase(o2.getName());
        if (result == 0) {
            result = o1.getPhone().compareTo(o2.getPhone());
        }
        return result;
    }
}