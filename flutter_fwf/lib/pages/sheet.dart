import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import '../data/flags.dart'; // should export a List<Flag> called `flags`

class SheetPage extends StatelessWidget {
  const SheetPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: const Color(0x62446B77), // '#446b7762' -> ARGB with alpha
      child: Center(
        child: SizedBox(
          width: 415,
          child: ListView.builder(
            padding: const EdgeInsets.all(10),
            itemCount: flags.length,
            itemBuilder: (context, index) {
              final f = flags[index];
              return Container(
                margin: const EdgeInsets.all(10),
                color: Colors.transparent,
                child: Column(
                  children: [
                    Text(
                      '${f.name} ',
                      textAlign: TextAlign.center,
                      style: const TextStyle(
                        fontSize: 20,
                        fontFamily: 'papyrus',
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 5),
                    Container(
                      height: 80,
                      alignment: Alignment.center,
                      color: Colors.transparent,
                      child: Center(
                        child: SvgPicture.asset(
                          f.flag,
                          width: 140,
                          height: 80,
                          fit: BoxFit.contain,
                        ),
                      ),
                    ),
                  ],
                ),
              );
            },
          ),
        ),
      ),
    );
  }
}